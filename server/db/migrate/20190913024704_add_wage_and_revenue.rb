class AddWageAndRevenue < ActiveRecord::Migration[6.0]
  def change
    change_table :attendances do |t|
      t.decimal :wage, :precision => 9, :scale => 2
      t.decimal :revenue, :precision => 9, :scale => 2
    end
  end
end
