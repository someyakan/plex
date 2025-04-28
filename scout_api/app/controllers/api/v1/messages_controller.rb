# app/controllers/api/v1/messages_controller.rb
module Api
  module V1
    class MessagesController < ApplicationController
      before_action :authenticate_company!  # 企業がログインしているか確認

      def create
        @student = Student.find(params[:student_id])  # 学生IDを取得
        @message = @student.messages.new(message_params)  # 学生に紐づけてメッセージを作成
        @message.company = current_company  # ログインしている企業が送信者

        # メッセージを保存
        if @message.save
          render json: @message, status: :created
        else
          render json: { error: @message.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def message_params
        params.require(:message).permit(:content)  # メッセージ内容を許可
      end
    end
  end
end
