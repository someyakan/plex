class AddDetailsToRooms < ActiveRecord::Migration[8.0]
  def change
    add_column :rooms, :student_id, :integer
    add_column :rooms, :company_id, :integer
  end
end
