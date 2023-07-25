from django.db import models


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)


class SalesPerson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=100)


class Sale(models.Model):
    price = models.CharField(max_length=50)
    automobile = models.ForeignKey(
        AutomobileVO, related_name="sales", on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        SalesPerson, related_name="sales", on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer, related_name="sales", on_delete=models.CASCADE
    )
