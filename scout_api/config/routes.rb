Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # 企業関連
      resources :companies, only: [:create, :index, :update] do
        # /api/v1/companies/:company_id/students にアクセスできるようにする
        resources :students, only: [:index], module: :companies
      end

      # 学生関連
      resources :students, only: [:create, :index, :update] do
        resources :rooms, only: [:index, :create] # 学生に紐づくRoom一覧
      end

      # セッション関連
      post 'login', to: 'student_sessions#create'
      post 'company_login', to: 'company_sessions#create'

      # メッセージ関連
      resources :messages, only: [:create]

      # ルーム関連
      resources :rooms, only: [:create]
    end
  end

  # ヘルスチェック用
  get "up" => "rails/health#show", as: :rails_health_check
end
