# **E-Commerce Backend**

## **Installation**
- 建立 Conda 虛擬環境(執行過一次就不用再執行)
```shell
conda env create -f environment.yaml
```

- 套件更新
```
conda install --yes --file requirements.txt
```

## **Migrate DB**
```shell
python manage.py migrate
```

## **Create Superuser**
```shell
python manage.py createsuperuser
```

## **Run in localhost**
```shell
pyhton manage.py runserver
```
localhost:8000/admin : 進入 django 後台

## **Update**
- 若有更新 Model:
```shell
pyhton manage.py makemigration
```

- 若有安裝新套件
```shell
conda list -e > requirement.txt
```