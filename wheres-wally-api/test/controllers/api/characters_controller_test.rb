require "test_helper"

class Api::CharactersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_characters_index_url
    assert_response :success
  end
end
