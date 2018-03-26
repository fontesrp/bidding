class ApplicationController < ActionController::API

  private

  def current_user

    token = request.headers['AUTHORIZATION']

    begin

      payload = JWT.decode(
        token,
        Rails.application.secrets.secret_key_base
      )&.first

      @user ||= User.find payload['id']
    rescue Exception => error
      nil
    end
  end

  def authenticate_user!
    head :unauthorized unless current_user.present?
  end

  def error(instance)
    render json: { error: instance.errors.full_messages }
  end
end
