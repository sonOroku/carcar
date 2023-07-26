from django.urls import path
from .views import (
    api_salespeople,
    api_show_salesperson,
    api_customer,
    api_show_customer,
    api_sales,
    api_show_sales,
    unsold_vins,
)

urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salespeople/<int:pk>/", api_show_salesperson, name="api_show_salesperson"),
    path("customers/", api_customer, name="api_customer"),
    path("customers/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("sales/", api_sales, name="api_sale"),
    path("sales/<int:pk>/", api_show_sales, name="api_show_sales"),
    path("unsold_vins", unsold_vins, name="unsold_vins"),
]
