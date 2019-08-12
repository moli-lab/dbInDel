from django.shortcuts import render
from ..models import Indel
def get_num(num):
    a=list(str(num))
    for i in range(len(a)):
        if((i+1)%3==0):
            a[i]=a[i]+','
    return "".join(a).rstrip(',')
def home(request):
    indels=Indel.objects
    ins,dels=indels.filter(indel='ins').count(),indels.filter(indel='del').count()
    return render(request, "pages/index.html", dict(ins=get_num(ins),dels=get_num(dels)))
