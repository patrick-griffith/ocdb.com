export default function ({ store, redirect, $auth }) {  
    if (!$auth.user.confirmed) {
      return redirect('/auth/confirm')
    }
  }