package edu.simpson.cis320;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.Console;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@WebServlet(name = "NameListEdit")

public class NameListEdit extends HttpServlet {



    private Pattern firstName;

    private Pattern lastName;

    private Pattern email;

    private Pattern phone;

    private Pattern birthday;



    public NameListEdit(){

        firstName = Pattern.compile("^[a-zA-Z]+(([',.-][a-z])?[a-zA-Z]*)*$");

        lastName = Pattern.compile("^[a-zA-Z]+(([',.-][a-z])?[a-zA-Z]*)*$");

        email = Pattern.compile("^[A-Za-z0-9-_.]+@[A-Za-z0-9]+[.]+[A-Za-z0-9.]{3,30}$");

        phone = Pattern.compile("^[0-9]{3}([-]?)[0-9]{3}([-]?)[0-9]{4}$");

        birthday = Pattern.compile("^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$");

    }



    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

        // Type of output (HTML, JSON, image, whatever

        response.setContentType("text/plain");

        PrintWriter out = response.getWriter();

        out.println("JSON Post");

        java.io.BufferedReader in = request.getReader();

        String requestString = new String();

        for (String line; (line = in.readLine()) != null; requestString += line);



        // Output the string we got as a request, just as a check

        // out.println(requestString);

        // Great! Now we want to use GSON to parse the object, and pop it into our business object. Field

        // names have to match. That's the magic.

        Gson gson = new Gson();

        Person fromJson = gson.fromJson(requestString, Person.class);



        boolean allValid = true;



        Matcher f = firstName.matcher(fromJson.getFirst());

        if (f.find()) {

            System.out.println("First Name Passed validation");

        } else {

            System.out.println("First Name Did not pass validation");

            allValid = false;

        }



        Matcher l = lastName.matcher(fromJson.getLast());

        if (l.find()) {

            System.out.println("Last Name Passed validation");

        } else {

            System.out.println("Last Name Did not pass validation");

            allValid = false;

        }



        Matcher e = email.matcher(fromJson.getEmail());

        if (e.find()) {

            System.out.println("Email Passed validation");

        } else {

            System.out.println("Email Did not pass validation");

            allValid = false;

        }



        Matcher p = phone.matcher(fromJson.getPhone());

        if (p.find()) {

            System.out.println("Phone Passed validation");

        } else {

            System.out.println("Phone Did not pass validation");

            allValid = false;

        }



        Matcher b = birthday.matcher(fromJson.getBirthday());

        if (b.find()) {

            System.out.println("Birthday Passed validation");

        } else {

            System.out.println("Birthday Did not pass validation");

            allValid = false;

        }



        if(allValid) {

            if(fromJson.getId() == null){

                PersonDAO.insertPerson(fromJson);

            } else {

                PersonDAO.editPerson(fromJson);

            }

            System.out.println("All the fields passed validation");

        } else{

            System.out.println("All the fields did not pass validation");

        }

    }



}