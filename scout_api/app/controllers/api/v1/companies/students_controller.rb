class Api::V1::Companies::StudentsController < ApplicationController
    before_action :set_company
  
    def index
      students = @company.rooms.includes(:student).map(&:student)
      render json: students, status: :ok
    end
  
    private
  
    def set_company
      @company = Company.find(params[:company_id])
    end
  end
  