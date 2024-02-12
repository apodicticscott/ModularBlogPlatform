import styles from "./loginPage.module.css" 

const LoginPage = () => {
  return (
    <div className={styles.container}>
        <div class="flex justify-center self-center p-10 z-10">
          <div class="p-20 bg-white mx-auto rounded-2xl w-100 ">
            <div class="mb-5">
              <h3 class="font-bold text-2xl text-gray-200">Sign In </h3>
              <p class="text-gray-500">Please sign in to your account.</p>
            </div>
            <div class="space-y-5">
              <div class="space-y-2">
                <label class="text-xl font-semibold text-gray-700 tracking-wide">
                  Email
                </label>
                <input class="w-full border-2 lg:border-3 rounded-md shadow-md text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-green-400" type="" placeholder="mail@gmail.com" />
              </div>
              <div class="space-y-2">
                <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <input class="w-full content-center text-base px-4 py-2 border  border-2 lg:border-3 rounded-md shadow-md focus:outline-none focus:border-green-400" type="" placeholder="Password" />
              </div>
              <div class="flex items-center justify-between">
                <div class="text-sm">
                  <a href="#" class="text-green-400 hover:text-green-500">
                    New? Create an account here!
                  </a>
                </div>
                </div>
                <div>
              <button type="submit" class="w-full flex justify-center bg-primary-dark  hover:bg-green-500 text-t-header-light p-3 border-2 lg:border-3 shadow-md rounded-md tracking-wide font-semibold cursor-pointer transition ease-in duration-500">
                Sign in
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default LoginPage
