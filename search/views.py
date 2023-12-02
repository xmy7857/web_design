# Create your views here.
from django.shortcuts import render  
from django.http import JsonResponse  
from whoosh.qparser import QueryParser  
from whoosh import fields, index, scoring  
import json  
  
def search(request):  
    if request.method == 'GET':  
        searchTerm = request.GET.get('term')  
        #创建索引文件
        with index.open_dir("search_index") as ix:  # 打开索引文件  
            with ix.searcher() as searcher:  # 创建一个搜索器对象  
                query = QueryParser("text", ix.schema).parse(searchTerm)  # 根据搜索词创建查询对象  
                results = searcher.search(query)  # 执行搜索，获取结果  
                data = [{'id': result['id'], 'text': result['text']} for result in results]  # 提取所需数据并转换为字典格式  
        return JsonResponse(data, safe=False)
def create_search_index():  
    schema = fields.Schema(text=<TEXT>)  # 根据你的模型结构调整schema  
    ix = index.create_in("search_index", schema)  # 创建索引文件  
  
    # 获取你想要添加到索引中的数据，并将其添加到索引中  
    # 例如，从数据库中获取数据并添加到索引中  
    for obj in <YourModel>.objects.all():  # 替换为你的模型名称  
        writer = ix.writer()  
        writer.add_document(text=obj.content)  # 根据你的模型结构调整数据提取和添加方式  
        writer.commit()