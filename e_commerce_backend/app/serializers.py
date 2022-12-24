from rest_framework import serializers

from .models import (Cart, Category, Product, Product_Comment, Tag,
                     Transaction, Wishlist)


class WishlistSerializer(serializers.ModelSerializer):
    class Meta :
        model = Wishlist 
        fields =["id","user","product"] 

class CartSerializer(serializers.ModelSerializer):
    class Meta :
        model = Cart
        fields = ["id" , "user" , "product"]       

class TagSerializer(serializers.ModelSerializer):
    class Meta :
        model = Tag
        fields = '__all__' 

class CategorySerializer(serializers.ModelSerializer):
    class Meta :
        model = Category
        fields = '__all__' 
        
class ProductSerializer(serializers.ModelSerializer):
    tag = TagSerializer(read_only=True, many=True)

    class Meta :
            model = Product
            fields =  ['id' , 'name' , 'seller' , 'category' ,  'price' ,'description' ,'image' ,'tag']




class TransactionSerializer(serializers.ModelSerializer):
    class Meta :
        model = Transaction
        fields = ['id','buyer','seller','product','date']

class ProductCommentSerializer(serializers.ModelSerializer):
    class Meta :
        model = Product_Comment
        fields = ['id','buyer' , 'comment' ]


