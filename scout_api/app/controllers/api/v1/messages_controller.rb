module Api
    module V1
      class MessagesController < ApplicationController
        def create
          # 学生と企業を取得
          company = Company.find(params[:message][:company_id])
          student = current_student  # 学生はログイン済みのユーザー（current_studentを使用）
  
          # すでに存在するRoomを探すか、新しいRoomを作成
          room = Room.find_or_create_by(student_id: student.id, company_id: company.id)
  
          # メッセージを作成
          @message = room.messages.create(message: params[:message], student_id: student.id, company_id: company.id)
  
          if @message.persisted?
            render json: @message, status: :created
          else
            # エラーメッセージをログに出力
            Rails.logger.error(@message.errors.full_messages)
            render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
          end
        end
  
        private
  
        def message_params
          params.require(:message).permit(:message, :student_id, :company_id, :room_id)
        end
      end
    end
  end
  