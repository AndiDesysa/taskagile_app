package com.taskagile.web.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.taskagile.domain.application.commands.RegistrationCommand;

public class RegistrationPayload {

  @Size(min = 2, max = 50, message="Username must be between 2 und 50")
  @NotNull
  private String username;

  @Email(message = "Email address should be valid")
  @Size(max = 100, message = "Email address must not be more than 100 characters")
  @NotNull
  private String emailAddress;

  @Size(min = 6, max = 30, message = "Password must be between 6 and 30 characters")
  @NotNull
  private String password;

  public RegistrationCommand toCommand() {
    return new RegistrationCommand(this.username, this.emailAddress, this.password);
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getUsername() {
    return this.username;
  }

  public void setEmailAddress(String emailAddress) {
    this.emailAddress = emailAddress;
  }

  public String getEmailAddress() {
    return this.emailAddress;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getPassword() {
    return this.password;
  }

}
