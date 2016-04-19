require 'rails_helper'
require 'support/violate_check_constraint_matcher.rb'

describe User do
  describe "email" do
    let(:user){
      User.create!(email: "foo@example.com",
                   password: "qereiwkddieie",
                   password_confirmation: "qereiwkddieie")
    }
    it "absolutely prevents invalid email addresses" do
      expect{
        user.update_attribute(:email, "foo@bar.com")
      }.to violate_check_constraint(:email_must_be_company_email)
    end
  end
end
