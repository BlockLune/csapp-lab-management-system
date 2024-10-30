package cc.blocklune.csapp.service;

import java.util.List;
import java.util.ArrayList;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.common.auth.CredentialsProviderFactory;
import com.aliyun.oss.common.auth.EnvironmentVariableCredentialsProvider;
import com.aliyun.oss.model.OSSObject;
import com.aliyun.oss.model.PutObjectRequest;
import com.aliyun.oss.model.ListObjectsV2Result;
import com.aliyun.oss.model.OSSObjectSummary;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.io.InputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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

  public void uploadFile(String objectName, InputStream inputStream) {
    PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, objectName, inputStream);
    ossClient.putObject(putObjectRequest);
  }

  public InputStream downloadFile(String objectName) {
    OSSObject ossObject = ossClient.getObject(bucketName, objectName);
    return ossObject.getObjectContent();
  }

  public List<String> listFiles(String keyPrefix) {
    try {
      ListObjectsV2Result result = ossClient.listObjectsV2(bucketName, keyPrefix);
      List<OSSObjectSummary> ossObjectSummaries = result.getObjectSummaries();
      return ossObjectSummaries.stream().map(OSSObjectSummary::getKey).toList();
    } catch (Exception e) {
      logger.error("Error occurred while listing files: {}", keyPrefix, e);
      return new ArrayList<String>();
    }
  }
}
