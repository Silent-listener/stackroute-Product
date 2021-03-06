package com.stackroute.samplingserver.job;

import com.stackroute.domain.GenericMetrics;
import com.stackroute.domain.KafkaDomain;
import org.apache.http.impl.client.HttpClients;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Date;


@Component
public class CPUCoresJob implements Job {

    private static KafkaTemplate<String, KafkaDomain> kafkaTemplate;
    private static String TOPIC;

    public CPUCoresJob() {  }

    @Autowired
    public CPUCoresJob(KafkaTemplate<String, KafkaDomain> kafkaTemplate) {
        if (CPUCoresJob.kafkaTemplate == null) {
            CPUCoresJob.kafkaTemplate = kafkaTemplate;
        }
        CPUCoresJob.TOPIC="cpuCores";
    }
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        ClientHttpRequestFactory requestFactory = new
                HttpComponentsClientHttpRequestFactory(HttpClients.createDefault());

        RestTemplate restTemplate = new RestTemplate(requestFactory);
        JobDataMap dataMap = jobExecutionContext.getJobDetail().getJobDataMap();
        ResponseEntity<GenericMetrics<Double>> response
                = restTemplate.exchange(dataMap.get("url") + "/cpucores"+
                        "?userID="+dataMap.get("userID")+"&applicationID="+dataMap.get("applicationID"),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<GenericMetrics<Double>>(){});
        System.out.println("cpucores... "+response.getBody()+ " topic.... "+TOPIC);
        System.out.println(new Date(System.currentTimeMillis()));
//        Map<Long,Object> responseMap=new HashMap<>();
//        responseMap.put(System.currentTimeMillis(),response.getBody());
//        kafkaTemplate.send(TOPIC, responseMap);

        KafkaDomain kafkaDomain=new KafkaDomain();
        kafkaDomain.setApplicationId(response.getBody().getApplicationID());
        kafkaDomain.setUserId(response.getBody().getUserID());
        kafkaDomain.setTime(System.currentTimeMillis());
        kafkaDomain.setMetrics(response.getBody().getMetrics());
        kafkaTemplate.send(TOPIC,kafkaDomain);
    }

}
