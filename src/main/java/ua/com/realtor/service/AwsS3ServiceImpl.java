package ua.com.realtor.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Objects;

@Service
public class AwsS3ServiceImpl {
  private final AmazonS3 amazonS3;
  @Value("${aws.s3.bucket}")
  private String bucket;

  @Autowired
  public AwsS3ServiceImpl(AmazonS3 amazonS3) {
    this.amazonS3 = amazonS3;
  }

  @Async
  public String uploadFile(final MultipartFile multipartFile) {
    try {
      final File file = convertMultiPartFileToFile(multipartFile);
      URL url = uploadFileToS3Bucket(bucket, file);
      Path filePath = Paths.get(file.getPath());
      Files.delete(filePath);
      return url.toString();
    } catch (final AmazonServiceException ex) {
      throw new AmazonServiceException(ex.getErrorMessage());
    } catch (final IOException ex) {
      throw new AmazonServiceException(ex.getMessage());
    }
  }

  private File convertMultiPartFileToFile(final MultipartFile multipartFile) throws IOException {
    final File file = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
    try (final FileOutputStream outputStream = new FileOutputStream(file)) {
      outputStream.write(multipartFile.getBytes());
    } catch (final IOException ex) {
      throw new IOException(ex.getMessage());
    }
    return file;
  }

  private URL uploadFileToS3Bucket(final String bucketName, final File file) {
    final String uniqueFileName = LocalDateTime.now() + "_" + file.getName();
    final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, uniqueFileName, file);
    amazonS3.putObject(putObjectRequest);
    return amazonS3.getUrl(bucket, uniqueFileName);
  }
}
