from django.shortcuts import render
from django.http import JsonResponse
from .models import Product
from .models import Transaction
from .models import Product_Comment
from .models import Tag
from .models import Category
from .serializers import ProductSerializer
from .serializers import TransactionSerializer
from .serializers import ProductCommentSerializer
from .serializers import TagSerializer
from .serializers import CategorySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

@api_view(["GET"])
def tag_list(request):
    tag = Tag.objects.all()
    serializer = TagSerializer(tag, many = True)
    return Response({'data':serializer.data})

@api_view(["GET"])
def category_list(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many = True)
    return Response({'data':serializer.data})

@api_view(["GET"])
def product_list(request):
    #get all the product serializer
    #serialize the data
    #return json
    products = Product.objects.all()
    serializer = ProductSerializer(products , many = True)
    return Response({'data':serializer.data})

@api_view(["GET"])
def product_detail(request,productid):
    
    try:
       product = Product.objects.get(id = productid)
       
    except Product.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    if request.method == 'GET' :
        serializer = ProductSerializer(product)
        return Response({'data':serializer.data})
       

@api_view(["GET"])
def transactionBuyer_list(request,id):


    try:
       transactions = Transaction.objects.get(buyer = id)
       
    except Product.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = TransactionSerializer(transactions)
        return Response({'data':serializer.data})

@api_view(["GET"])
def transactionSeller_list(request,id):


    try:
       transactions = Transaction.objects.get(seller = id)
       
    except Product.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = TransactionSerializer(transactions)
        return Response({'data':serializer.data})


@api_view(["GET" ,"PUT"])
def product_comment_list(request,productid):
    try:
       productComment = Product_Comment.objects.filter(product = productid)
   
    except Product_Comment.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)

    if request.method == 'GET' :
        
        serializer = ProductCommentSerializer(productComment, many = True)
        return Response({'data':serializer.data})