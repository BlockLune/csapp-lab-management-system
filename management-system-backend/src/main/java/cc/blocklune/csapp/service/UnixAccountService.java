package cc.blocklune.csapp.service;

import cc.blocklune.csapp.exceptions.UnixAccountException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.io.OutputStreamWriter;
import java.io.IOException;
import java.lang.InterruptedException;

@Service
public class UnixAccountService {
  private static final Logger logger = LoggerFactory.getLogger(UnixAccountService.class);

  public void createUnixAccount(String username, String password) throws UnixAccountException {
    try {
      String[] createUserCommand = {
          "useradd",
          "-m",
          "-s", "/bin/bash",
          username
      };

      Process process = Runtime.getRuntime().exec(createUserCommand);
      int exitCode = process.waitFor();

      if (exitCode != 0) {
        logger.error("Failed to create user account, exit code: {}", exitCode);
        logger.error("The command is: {}", String.join(" ", createUserCommand));
        throw new UnixAccountException("Failed to create user account");
      }

      String[] setPasswordCommand = {
          "chpasswd"
      };

      Process passwordProcess = Runtime.getRuntime().exec(setPasswordCommand);
      OutputStreamWriter writer = new OutputStreamWriter(passwordProcess.getOutputStream());
      writer.write(username + ":" + password);
      writer.close();

      exitCode = passwordProcess.waitFor();

      if (exitCode != 0) {
        Runtime.getRuntime().exec(new String[] { "userdel", "-r", username });
        logger.error("Failed to set password");
        throw new UnixAccountException("Failed to set password");
      }

      logger.info("Successfully created Unix account for user: {}", username);

    } catch (IOException | InterruptedException e) {
      throw new UnixAccountException("Error creating Unix account: " + e.getMessage());
    }
  }
}
