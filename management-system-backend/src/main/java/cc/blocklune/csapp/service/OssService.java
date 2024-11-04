package cc.blocklune.csapp.service;

import java.util.List;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.io.InputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.net.URI;

@Service
public class OssService {
  private static final Logger logger = LoggerFactory.getLogger(OssService.class);

  @Value("${s3.endpoint}")
  private String endpoint;

  @Value("${s3.bucket-name}")
  private String bucketName;

  @Value("${s3.region}")
  private String region;

  @Value("${s3.access-key-id}")
  private String accessKeyId;

  @Value("${s3.secret-access-key}")
  private String secretAccessKey;

  private S3Client s3Client;

  @PostConstruct
  public void init() {
    if (endpoint.isEmpty() || bucketName.isEmpty()) {
      logger.error("Endpoint or bucket name is not configured properly.");
      throw new IllegalStateException("S3 configuration is incomplete.");
    }

    AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(accessKeyId, secretAccessKey);

    s3Client = S3Client.builder()
        .endpointOverride(URI.create(endpoint))
        .region(Region.of(region))
        .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
        .build();

    logger.info("S3Client initialized with endpoint: {} and bucket: {}", endpoint, bucketName);
  }

  @PreDestroy
  public void shutdown() {
    if (s3Client != null) {
      s3Client.close();
      logger.info("S3Client shutdown.");
    }
  }

  public void uploadFile(String objectName, InputStream inputStream) throws Exception {
    s3Client.putObject(PutObjectRequest.builder()
        .bucket(bucketName)
        .key(objectName)
        .build(),
        RequestBody.fromInputStream(inputStream, inputStream.available()));
  }

  public InputStream downloadFile(String objectName) {
    ResponseInputStream<GetObjectResponse> response = s3Client.getObject(GetObjectRequest.builder()
        .bucket(bucketName)
        .key(objectName)
        .build());
    return response;
  }

  public List<String> listFiles(String keyPrefix) {
    ListObjectsV2Response response = s3Client.listObjectsV2(ListObjectsV2Request.builder()
        .bucket(bucketName)
        .prefix(keyPrefix)
        .build());

    return response.contents().stream()
        .map(S3Object::key)
        .map(key -> {
          String[] parts = key.split("/");
          return parts[parts.length - 1];
        })
        .toList();
  }

  public void deleteFile(String objectName) {
    s3Client.deleteObject(DeleteObjectRequest.builder()
        .bucket(bucketName)
        .key(objectName)
        .build());
  }
}
