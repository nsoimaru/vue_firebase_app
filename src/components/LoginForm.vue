<!-- eslint-disable indent -->
<!-- eslint-disable no-unused-expressions -->
<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable no-undef -->
<template>
    <div class="text-white text-center font-bold p-5 mb-4"
    v-if="login_show_alert" :class="login_alert_variant">
        {{ login_alert_msg }}
    </div>
    <vee-form :validation-schema="loginSchema"
        @submit="login">
        <!-- Email -->
        <div class="mb-3">
            <label class="inline-block mb-2">Email</label>
            <div class="mb-3">
            <vee-field type="email" name="email" autocomplete="on"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
                <ErrorMessage class="text-red-600" name="email"></ErrorMessage>
            </div>
        </div>
        <!-- Password -->
        <div class="mb-3">
            <label class ="inline-block mb-2">Password</label>
            <div class="mb-3">
            <vee-field type="password" name="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Password" />
            <ErrorMessage class="text-red-600" name="password"></ErrorMessage>
            </div>
        </div>
        <button type="submit" :disabled="login_in_submission"
            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
            hover:bg-purple-700">
            Submit
        </button>
    </vee-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:6|max:32',
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_msg: 'Please wait! We are logging you in.',
    };
  },
  methods: {
    login(values) {
      this.login_in_submission = true;
      this.login_show_alert = true;
      this.login_alert_variant = 'bg-blue-500';
      this.login_alert_msg = 'Please wait! We are logging you in.';

      this.login_alert_variant = 'bg-green-500';
      this.login_alert_msg = 'SUCCESS! You are logged in.';
      console.log(values);
    },
  },
};
</script>
