"use client";
import React, { useContext, useEffect, useState } from "react";
import { supabase } from "./services/supabaseClient";
import { UserDetailContext } from "./context/UserDetailContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;

      const { data: Users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user.email);

      console.log(Users);

      if (error) {
        console.error("Error fetching users:", error);
        return;
      }

      if (!Users || Users.length === 0) {
        const { data: newUser, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              name: user.user_metadata?.name,
              email: user.email,
              picture: user.user_metadata?.picture,
            },
          ])
          .select();

        if (insertError) {
          console.error("Error inserting user:", insertError);
          return;
        }

        setUser(newUser[0]);
      } else {
        setUser(Users[0]);
      }
    });
  };

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
    </PayPalScriptProvider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUser must be used within a <Provider>");
  }
  return context;
};
