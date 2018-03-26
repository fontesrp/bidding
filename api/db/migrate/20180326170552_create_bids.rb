class CreateBids < ActiveRecord::Migration[5.1]
  def change
    create_table :bids do |t|
      t.float :value
      t.references :auction, foreign_key: true, index: true
      t.references :user, foreign_key: true, index: true

      t.timestamps
    end
  end
end
