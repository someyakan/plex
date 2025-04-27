class Api::V1::StudentSessionsController < ApplicationController
  def create
    Rails.logger.debug "Received email: #{params[:email]}, password: #{params[:password]}"

    student = Student.find_by(email: params[:email])
    if student.nil?
      render json: { error: 'そのメールアドレスの学生は登録されていません' }, status: :not_found
      return
    end

    if student.authenticate(params[:password])
      render json: { student: student }, status: :ok
    else
      render json: { error: 'メールアドレスまたはパスワードが間違っています' }, status: :unauthorized
    end
  end
end

