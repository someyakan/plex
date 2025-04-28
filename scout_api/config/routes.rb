Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # 企業関連
      resources :companies, only: [:create, :index, :update, :show] do
        # 企業に関連する学生一覧を取得
        get 'students', to: 'companies#students'  # /api/v1/companies/:id/students

        # 企業が学生にメッセージを送信
        resources :students, only: [] do
          resources :messages, only: [:create]  # /api/v1/companies/:company_id/students/:student_id/messages
        end
      end

      # 学生関連
      resources :students, only: [:create, :index, :update, :show] do
        # 学生に紐づくRoom一覧
        resources :rooms, only: [:index, :create] 
        
        # 学生に紐づくメッセージ送信
        resources :messages, only: [:create]  # /api/v1/students/:id/messages

        # 学生のマイページでメッセージを取得
        get 'mypage', to: 'students#mypage'  # /api/v1/students/:id/mypage
      end

      # セッション関連
      post 'login', to: 'student_sessions#create'
      post 'company_login', to: 'company_sessions#create'

      # メッセージ関連 (企業から学生へ送信)
      resources :messages, only: [:create]

      # ルーム関連
      resources :rooms, only: [:create]
    end
  end

  # ヘルスチェック用
  get "up" => "rails/health#show", as: :rails_health_check
end
