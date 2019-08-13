<h3>What is dbInDel</h3>
dbInDel (http://enhancer-indel.cam-su.org/) is a comprehensive and interactive database cataloging enhancer-associated insertion and deletion variants for both human and murine samples computational analyses of H3K27ac ChIP-Seq data.

<p style="color:#2E75B5">The dbInDel website is built by the <span style="color:red">HTML5</span>  and <span style="color:red">JavaScript libraries</span> , including jQuery (http://jquery.com), <span style="color:red">Bootstrap (http://getbootstrap.com/)</span>  for the client-side user interface. The server-side and interactive data processing are carried out by <span style="color:red">Django (version 2.0.3)</span> . The datasets are stored in <span style="color:red">MySQL (version 5.7.17) and redis (version 5.0.5)</span> databases. The web site automatically adjusts the look and feel according to different browsers and devices, ranging from desktop computers to tablets and smart phones.</p>
<h3>How to use dbindel</h3>
first you need install Redis.

Clone ``` git clone https://github.com/moli-lab/dbIndel.git ```

```redis-server /usr/local/redis-5.0.4/etc/redis.conf```

cd construct-dbInDel

for virtualenv user:

1 ```virtualenv dbindel```

2 ```source dbindel/bin/activate```

3 ```pip install -r requirements.txt```


for pipenv user:

1 ```pipenv shell```

2 ```pipenv install -r requirements.txt```

then,

1 ```python3 manage.py makemigrations dbIndel```

2 ```python3 manage.py migrate```

3 ```python3 manage.py runserver```




