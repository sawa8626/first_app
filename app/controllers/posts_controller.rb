class PostsController < ApplicationController
# 一覧ページ
  def index
    @posts = Post.all.order(id: "DESC")
  end

# 新規投稿
  def create
    Post.create(content: params[:content])
    redirect_to action: :nidex
  end

  # 既読のチェック
  def checked
    post = Post.find(params[:id])
    if post.checked then
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end
end
