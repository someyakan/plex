class Api::V1::RoomsController < ApplicationController
    # 学生に関連するルームの一覧を取得
    def index
      student = Student.find(params[:student_id])
      rooms = Room.where(student_id: student.id)
      render json: rooms
    end
  
    # 新しいルームを作成
    def create
      room = Room.new(room_params)
  
      if room.save
        render json: room, status: :created
      else
        render json: { errors: room.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    # 受け取るパラメータの許可
    def room_params
      params.require(:room).permit(:student_id, :company_id)
    end
  end
  