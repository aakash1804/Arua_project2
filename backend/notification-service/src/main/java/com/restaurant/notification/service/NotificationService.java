package com.restaurant.notification.service;

import com.restaurant.notification.entity.Notification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class NotificationService {

    private final List<Notification> inMemoryStore = Collections.synchronizedList(new ArrayList<>());

    public void saveAndDispatch(Notification notification) {
        notification.setId((long) (inMemoryStore.size() + 1));
        inMemoryStore.add(0, notification);
    }

    public List<Notification> getNotifications(String email) {
        return inMemoryStore;
    }
}

