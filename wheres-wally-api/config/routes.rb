Rails.application.routes.draw do
  namespace :api do
    get "characters/index"
    resources :images, only: [:index, :show] do
      resources :characters, only: [:index]
      resources :scores, only: [:index]
    end
    post "game_sessions", to: "game_sessions#create"
    patch "game_sessions/:id/complete", to: "game_sessions#complete"
    post "validate", to: "validations#check"

    resources :scores, only: [:create]
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end