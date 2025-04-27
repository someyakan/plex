# app/controllers/api/v1/company_sessions_controller.rb
class Api::V1::CompanySessionsController < ApplicationController
    def create
      company = Company.find_by(email: params[:email])
      if company&.authenticate(params[:password])
        render json: { company: company }, status: :ok
      else
        render json: { error: 'メールアドレスまたはパスワードが間違っています' }, status: :unauthorized
      end
    end
  end
  