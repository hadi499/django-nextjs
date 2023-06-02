from django.urls import path

from . import views


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('posts/', views.getPosts, name='posts'),
    path('posts/create/', views.createPost, name='create'),
    path('posts/upload/', views.uploadImage, name='upload'),
    path('posts/<int:pk>/', views.post_detail, name='detail'),
    path('posts/delete/<int:pk>/', views.post_delete, name='delete'),
    path('posts/update/<int:pk>/', views.updateProduct, name='update'),

]
