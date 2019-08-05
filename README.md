<h3>What is dbInDel</h3>

dbInDel contains 640,439 insertions and 157,566 deletions in 593,676 putative enhancers detected from 254 human and 21 murine samples based on computational analyses of H3K27ac ChIP-Seq data (for detailed information, please see Statistics). To facilitate the analysis of target transcripts of indel-containing enhancers, the website integrates mRNA expression data and survival analysis in tumor and normal samples. Moreover, our database identifies the potential recruitment of transcriptional factors as a result of enhancer-associated indels.

<h3>How to use dbindel</h3>

for virtualenv user,

1,```virtualenv dbindel```

2,```source dbindel/bin/activate```

3,```pip install -r requirements.txt```



for pipenv user,

1,```pipenv shell```

2,```pipenv install```



4,```python3 manage.py makemigrations dbIndel```

5,```python3 manage.py migrate```

5,```python3 manage.py runserver```



