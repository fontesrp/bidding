class ApplicationController < ActionController::API

  private

  def current_user

    # TODO: authenticate using JWT

    @user ||= User.find_by_id 1
  end

  def authenticate_user!
    head :unauthorized unless current_user.present?
  end

  def error(instance)
    render json: { error: instance.errors.full_messages }
  end
end
