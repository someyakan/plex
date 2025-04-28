module Api
  module V1
    class StudentsController < ApplicationController
      before_action :set_student, only: [:update, :mypage]

      # GET /api/v1/students
      def index
        students = Student.all
        render json: students, status: :ok
      end

      # GET /api/v1/students/:id
      def show
        @student = Student.find_by(id: params[:id])  # IDに基づいて学生を検索
        if @student
          render json: @student
        else
          render json: { error: 'Student not found' }, status: :not_found
        end
      end

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
        # 学生に関連する企業情報を取得
        companies = @student.company_rooms.includes(:company).map do |room|
          {
            company_id: room.company.id,
            company_name: room.company.name,
            room_id: room.id,
            messages: room.messages.includes(:student).map { |message| { content: message.content, sent_at: message.created_at } }
          }
        end

        render json: { companies: companies }, status: :ok
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
