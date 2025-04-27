module Api
  module V1
    class CompaniesController < ApplicationController

      def index
        companies = Company.all
        render json: companies, status: :ok
      end
    
      
      # 企業新規登録
      def create
        company = Company.new(company_params_create)
        if company.save
          render json: { company: company }, status: :created
        else
          render json: { errors: company.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # プロフィール編集
      def update
        company = Company.find(params[:id])
        puts "受け取ったparams: #{params.inspect}"
        
        if company.update(company_params_update)
          render json: { company: company }, status: :ok
        else
          puts "バリデーションエラー: #{company.errors.full_messages}"
          render json: { errors: company.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # 企業詳細情報取得
      def show
        company = Company.find(params[:id])
        render json: company
      end

      private

      # 登録用パラメータ（パスワード含む）
      def company_params_create
        params.require(:company).permit(:name, :email, :password, :password_confirmation)
      end

      # 更新用パラメータ（パスワードを除く）
      def company_params_update
        params.require(:company).permit(:name, :email, :profile)
      end
    end
  end
end
