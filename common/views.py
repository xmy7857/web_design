from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from common.models import user,ticket_fare,orders,ticket

# Create your views here.
def logi(request):
    usrname=request.POST.get("username")
    passwd=request.POST.get("password")

    return JsonResponse({"ret":0,"name":"xxx","username": usrname, "password": passwd})

def login(request):

    # 从请求消息中 获取修改客户的信息
    # 找到该客户，并且进行修改操作
    customer_username = request.POST.get('username')
    customer_passwd = request.POST.get('password')

    try:
        # 根据 id 从数据库中找到相应的客户记录
        customer = user.objects.get(username=customer_username)
    except user.DoesNotExist:
        return  JsonResponse({
                'ret': 1,
                'msg': f'用户名为`{customer_username}`的用户不存在'
                })
    if(customer_passwd!=customer.password):
        return JsonResponse({
                'ret': 1,
                'msg': '密码错误'
                })
    elif(customer.is_active==True):
        return JsonResponse({
            'ret':1,
            'msg': '已在其他地方登录'
        })

    customer.is_active=True

    # 注意，一定要执行save才能将修改信息保存到数据库
    customer.save()

    return JsonResponse({'ret': 0,'nickname': customer.nickname, 'username': customer.username})

def signin(request):
    customer_username = request.POST.get('username')
    customer_passwd = request.POST.get('password')
    customer_nick=request.POST.get('nickname')
    try:
        # 根据 id 从数据库中找到相应的客户记录
        customer = user.objects.get(username=customer_username)
    except user.DoesNotExist:
        record = user.objects.create(username=customer_username, nickname=customer_nick, password=customer_passwd, is_active=False)
        return  JsonResponse({
                'ret': 0
                })
    return JsonResponse({
                'ret': 1,
                'msg': '用户已存在，忘记密码请联系管理员'
                })

def ticket_query(request):
    scenic_name=request.POST.get('scenic')
    scenic = ticket_fare.objects.get(scenic=scenic_name)
    return  JsonResponse({
                'ret': 0,
                'adult': scenic.adult,
                'student': scenic.student,
                'kid': scenic.kid
                })

def add_order(request):
    scenic=request.POST.get('scenic')
    time=request.POST.get('time')
    cost=request.POST.get('cost')
    usr=request.POST.get('username')
    record = orders.objects.create(username=usr, scenic=scenic, time=time, cost=cost)
    return JsonResponse({'ret':0,'id':record.id})

def logout(request):
    customer_username=request.POST.get('username')
    customer = user.objects.get(username=customer_username)
    customer.is_active=False
    customer.save()
    return JsonResponse({'ret':0})

def detail_order(request):
    order_id=request.POST.get('order_id')
    ticket_type=request.POST.get('ticket_type')
    cost=request.POST.get('ticket_cost')
    identify=request.POST.get('identify')
    travel_date=request.POST.get('travel_date')
    record = ticket.objects.create(order_id=order_id,ticket_type=ticket_type,ticket_cost=cost,identify=identify,travel_date=travel_date)
    if(record):
        return JsonResponse({'ret':0})
    else:
        record=orders.objects.get(id=order_id)
        record.delete()
        return JsonResponse({'ret':1,'msg':'ticket插入失败'})


def myorderPOST(request):
    username=request.POST.get('username')
    data = orders.objects.filter(username=username)
    data_list = [{'scenic': item.scenic, 'date': item.time, 'cost': item.cost, 'order_id': item.id} for item in data]
    return JsonResponse(data_list, safe=False)

def myticketPOST(request):
    order_id=request.POST.get('order_id')
    data = ticket.objects.filter(order_id=order_id)
    data_list = [{'ticket_type': item.ticket_type, 'ticket_cost': item.ticket_cost, 'identify': item.identify, 'id': item.id, 'travel_date':item.travel_date} for item in data]
    #return JsonResponse({'length':len(data_list)})
    return JsonResponse(data_list, safe=False)

def clear_order(request):
    order_id=request.POST.get('order_id')
    del_tickets=ticket.objects.filter(order_id=order_id)
    del_tickets.delete()
    del_order=orders.objects.get(id=order_id)
    del_order.delete()
    return JsonResponse({'ret':0})

def clear_ticket(request):
    ticket_id=request.POST.get('ticket_id')
    del_tickets=ticket.objects.get(id=ticket_id)
    del_tickets.delete()
    return JsonResponse({'ret':0})


def mybd(request):
    date=request.POST.get('data')
    if(date!=None):
        return JsonResponse({'msg':'hello vue', 'date':date})
    else:
        return JsonResponse({'msg':'fail vue'})

