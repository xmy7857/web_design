from django.db import models
from whoosh.fields import *  
from whoosh.index import create_in  
  
class SearchIndex(models.Model):  
    text = models.TextField(stored=True)  # 用于存储搜索内容的字段  
    # 其他你想要搜索的字段  
  
    def __str__(self):  
        return self.text
# Create your models here.
