from rest_framework import serializers
from .models import Product
from .models import Transaction
from .models import Tag
from.models import Product_Comment
from .models import Category
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


