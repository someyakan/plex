class AddProfileToCompanies < ActiveRecord::Migration[8.0]
  def change
    add_column :companies, :profile, :text
  end
end
