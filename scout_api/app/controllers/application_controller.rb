# app/controllers/application_controller.rb
require 'jwt'

class ApplicationController < ActionController::API
  # 企業の認証を行う
  def authenticate_company!
    token = request.headers['Authorization']&.split(' ')&.last
    decoded_token = decode_jwt(token)

    if decoded_token.nil? || decoded_token[:role] != 'company'
      render json: { error: 'Unauthorized' }, status: :unauthorized
    else
      @current_company = Company.find_by(id: decoded_token[:company_id])
      render json: { error: 'Unauthorized' }, status: :unauthorized unless @current_company
    end
  end

  private

  # JWTのデコードメソッド（必要に応じてカスタマイズ）
  def decode_jwt(token)
    # Rails.application.credentials.secret_key_baseを使用
    begin
      decoded = JWT.decode(token, Rails.application.credentials.secret_key_base, true, { algorithm: 'HS256' })
      decoded.first
    rescue JWT::DecodeError
      nil
    end
  end
end
