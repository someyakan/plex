module Api
  module V1
    class StudentsController < ApplicationController
      before_action :set_student, only: [:update, :mypage]

      # POST /api/v1/students
      def create
        student = Student.new(student_params)
        if student.save
          render json: { student: student }, status: :created
        else
          render json: { errors: student.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PUT /api/v1/students/:id
      def update
        if @student.update(student_params)
          render json: { student: @student }, status: :ok
        else
          render json: { errors: @student.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # GET /api/v1/students/:id/mypage
      def mypage
        student = Student.find(params[:id])
        companies = student.company_rooms # この部分で企業に関連する情報を取得
        render json: companies
      end

      private

      def set_student
        @student = Student.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Student not found' }, status: :not_found
      end

      def student_params
        params.require(:student).permit(:email, :password, :password_confirmation, :name, :profile)
      end
    end
  end
end
