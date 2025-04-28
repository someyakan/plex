module Api
  module V1
    class CompaniesController < ApplicationController

      def index
        companies = Company.all
        render json: companies, status: :ok
      end

      def create
        company = Company.new(company_params_create)
        if company.save
          render json: { company: company }, status: :created
        else
          render json: { errors: company.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        company = Company.find(params[:id])
        if company.update(company_params_update)
          render json: { company: company }, status: :ok
        else
          render json: { errors: company.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        company = Company.find(params[:id])
        render json: company
      end

      # ★ ここを新しく追加
      def students
        company = Company.find(params[:company_id])
        students = company.students  # アソシエーション: has_many :students 必要
        render json: students
      end

      private

      def company_params_create
        params.require(:company).permit(:name, :email, :password, :password_confirmation)
      end

      def company_params_update
        params.require(:company).permit(:name, :email, :profile)
      end
    end
  end
end

