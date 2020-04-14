package com.cychess.controller;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

/**
 * Controller class for using information from the server and modifying it
 * @author bbanothu
 *
 */
 
@RestController
public class FunctionController {
    //42.335190,-83.049190
    @ResponseBody
    @RequestMapping(value = "/json" , method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    public String json(@RequestParam("latitude") String latitude,@RequestParam("longitude") String longitude ) {
        long todayEpochTime = System.currentTimeMillis();
    	String append = latitude + "," + longitude + Long.toString(todayEpochTime);
        final String uri = "https://api.darksky.net/forecast/0b67f8f549800f7bdeccc85500ba9324/" + append;
        // end point call for today
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);
        JsonObject today = new Gson().fromJson(result, JsonObject.class);

        // end point call for last year
        todayEpochTime = Instant.ofEpochMilli(todayEpochTime).atZone(ZoneId.systemDefault()).minusYears(1).toEpochSecond();
        final String uri1 = uri +  "," + Long.toString(todayEpochTime);
        result = restTemplate.getForObject(uri1, String.class);
        JsonObject lastYear = new Gson().fromJson(result, JsonObject.class);

        // init json objects
        JsonObject returnVal = new JsonObject();
        JsonObject todayReturn = new JsonObject();
        JsonObject lastYearReturn = new JsonObject();
        
        // used to shorten code when adding values into todayReturn and lastYearReturn
        JsonObject temp = today.getAsJsonObject("daily").getAsJsonArray("data").get(0).getAsJsonObject();
        JsonObject temp2 = lastYear.getAsJsonObject("daily").getAsJsonArray("data").get(0).getAsJsonObject();

        // retrive date and time 
        long epochToday = Long.parseLong( today.getAsJsonObject("currently").get("time").getAsString() );
        long epochLastYear = Long.parseLong( lastYear.getAsJsonObject("currently").get("time").getAsString() );
        Date todayDate = new Date( epochToday * 1000 );
        Date lastYearDate = new Date( epochLastYear * 1000 );
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");  
        DateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
        // today
        String  strDate = dateFormat.format(todayDate);  
        String  strTime = timeFormat.format(todayDate);  
        String epochTodayTempHigh = timeFormat.format(new Date (Long.parseLong(temp.get("temperatureHighTime").getAsString())* 1000));
        String epochTodayTemplow = timeFormat.format(new Date (Long.parseLong(temp.get("temperatureLowTime").getAsString())* 1000));
        String epochTodaysunrise= timeFormat.format(new Date (Long.parseLong(temp.get("sunriseTime").getAsString())* 1000));
        String epochTodaysunset = timeFormat.format(new Date (Long.parseLong(temp.get("sunsetTime").getAsString())* 1000));
        // last year
        String  strDate2 = dateFormat.format(lastYearDate); 
        String  strTime2 = timeFormat.format(lastYearDate); 
        String epochlastTempHigh = timeFormat.format(new Date (Long.parseLong(temp2.get("temperatureHighTime").getAsString())* 1000));
        String epochlastTemplow = timeFormat.format(new Date (Long.parseLong(temp2.get("temperatureLowTime").getAsString())* 1000));
        String epochlastsunrise= timeFormat.format(new Date (Long.parseLong(temp2.get("sunriseTime").getAsString())* 1000));
        String epochlastsunset = timeFormat.format(new Date (Long.parseLong(temp2.get("sunsetTime").getAsString())* 1000));
        
        // add values to today json
        todayReturn.addProperty("date", strDate);
        todayReturn.addProperty("time", strTime);
        todayReturn.add("temperature",today.getAsJsonObject("currently").get("temperature"));
        todayReturn.addProperty("sunriseTime", epochTodaysunrise);
        todayReturn.addProperty("sunsetTime", epochTodaysunset);
        todayReturn.add("temperatureHigh",temp.get("temperatureHigh"));
        todayReturn.addProperty("temperatureHighTime", epochTodayTempHigh);
        todayReturn.add("temperatureLow",temp.get("temperatureLow"));
        todayReturn.addProperty("temperatureLowTime", epochTodayTemplow);
        lastYearReturn.addProperty("date", strDate2);
        lastYearReturn.addProperty("time", strTime2);
        lastYearReturn.add("temperature",lastYear.getAsJsonObject("currently").get("temperature"));
        lastYearReturn.addProperty("sunriseTime", epochlastsunrise);
        lastYearReturn.addProperty("sunsetTime", epochlastsunset);
        lastYearReturn.add("temperatureHigh",temp.get("temperatureHigh"));
        lastYearReturn.addProperty("temperatureHighTime", epochlastTempHigh);
        lastYearReturn.add("temperatureLow",temp.get("temperatureLow"));
        lastYearReturn.addProperty("temperatureLowTime", epochlastTemplow);
        returnVal.add("today", todayReturn);
        returnVal.add("lastYear", lastYearReturn);
    
        
        System.out.println(returnVal.toString());
        return returnVal.toString();
    }
	
  
}