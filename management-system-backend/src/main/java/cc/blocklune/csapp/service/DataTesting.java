package cc.blocklune.csapp.service;

import java.nio.file.Paths;
import org.springframework.boot.CommandLineRunner;

// Uncomment the next lines to do a uploading and downloading test
// import org.springframework.stereotype.Component;
// @Component
class OssServiceCommandLineRunner implements CommandLineRunner {
  private final OssService ossService;

  public OssServiceCommandLineRunner(OssService ossService) {
    this.ossService = ossService;
  }

  @Override
  public void run(String... args) throws Exception {
    String objectName = "hello.txt";
    String localFilePath = "hello.txt";
    String downloadedFilePath = "downloaded_hello.txt";

    // Normalize the file paths to be absolute
    localFilePath = Paths.get(localFilePath).toAbsolutePath().toString();
    downloadedFilePath = Paths.get(downloadedFilePath).toAbsolutePath().toString();

    // Upload the file
    try {
      ossService.uploadFile(objectName, localFilePath);
      System.out.println("File uploaded");
    } catch (Exception e) {
      System.err.println("Error while uploading");
      return;
    }

    // Download the file
    try {
      ossService.downloadFile(objectName, downloadedFilePath);
      System.out.println("File downloaded successfully to: " + downloadedFilePath);
    } catch (Exception e) {
      System.err.println("Error while downloading");
    }
  }
}
