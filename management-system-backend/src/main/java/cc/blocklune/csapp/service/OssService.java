package cc.blocklune.csapp.service;

import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.OSSException;
import com.aliyun.oss.common.auth.CredentialsProviderFactory;
import com.aliyun.oss.common.auth.EnvironmentVariableCredentialsProvider;
import com.aliyun.oss.model.GetObjectRequest;
import com.aliyun.oss.model.OSSObject;
import com.aliyun.oss.model.PutObjectRequest;
import com.aliyun.oss.model.PutObjectResult;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class OssService {
  private static final Logger logger = LoggerFactory.getLogger(OssService.class);

  @Value("${aliyun.oss.endpoint}")
  private String endpoint;

  @Value("${aliyun.oss.bucket-name}")
  private String bucketName;

  private EnvironmentVariableCredentialsProvider credentialsProvider;
  private OSS ossClient;

  public OssService() {
  }

  @PostConstruct
  public void init() throws Exception {
    if (endpoint.isEmpty() || bucketName.isEmpty()) {
      logger.error("Endpoint or bucket name is not configured properly.");
      throw new IllegalStateException("OSS configuration is incomplete.");
    }
    this.credentialsProvider = CredentialsProviderFactory.newEnvironmentVariableCredentialsProvider();
    ossClient = new OSSClientBuilder().build(endpoint, credentialsProvider);
    logger.info("OSSClient initialized with endpoint: {} and bucket: {}", endpoint, bucketName);
  }

  @PreDestroy
  public void shutdown() {
    if (ossClient != null) {
      ossClient.shutdown();
      logger.info("OSSClient shutdown.");
    }
  }

  public void uploadFile(String objectName, String filePath) {
    try {
      InputStream inputStream = new FileInputStream(filePath);
      PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, objectName, inputStream);
      ossClient.putObject(putObjectRequest);
      logger.info("File uploaded: {} -> {}", filePath, objectName);
    } catch (Exception e) {
      logger.error("Error occurred while uploading file: {}", objectName, e);
    }
  }

  public void downloadFile(String objectName, String filePath) {
    try {
      ossClient.getObject(new GetObjectRequest(bucketName, objectName), new File(filePath));
      logger.info("File downloaded: {} -> {}", objectName, filePath);
    } catch (OSSException | ClientException e) {
      logger.error("Error occurred while downloading file: {}", objectName, e);
    }
  }
}
