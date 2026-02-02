require "test_helper"

class Api::GameSessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_game_sessions_create_url
    assert_response :success
  end

  test "should get complete" do
    get api_game_sessions_complete_url
    assert_response :success
  end
end
