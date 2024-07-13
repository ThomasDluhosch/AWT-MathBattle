# Stage 1: Build the frontend
FROM node:20 as build-frontend

WORKDIR /app/mathBattle/client

# Copy the frontend package.json and yarn.lock
COPY client .
ENV NODE_ENV=development
RUN yarn


# Create .env file
RUN touch .env && \
    echo VITE_BACKEND_PATH=https://mathbattle.azurewebsites.net/api >> .env && \
    echo VITE_USE_BACKEND=TRUE >> .env

RUN yarn build

# Stage 2: Build the backend
FROM node:20 as build-backend


WORKDIR /app/mathBattle/server

# Copy the backend package.json and yarn.lock
COPY server .
ENV NODE_ENV=development
RUN yarn

# Copy the rest of the backend source code

# Verify that the files are copied correctly
RUN ls -la /app/mathBattle/server

# Copy frontend build to the backend
COPY --from=build-frontend /app/mathBattle/client/dist ./dist/client

# Verify TypeScript is installed
RUN yarn global add typescript
RUN tsc --version

# Attempt to build the backend
RUN yarn build

# Stage 3: Final stage to create the production image
FROM node:20-alpine

WORKDIR /app

# Copy backend build from build-backend stage
COPY --from=build-backend /app/mathBattle/server .
#COPY --from=build-frontend /app/mathBattle/client/dist ./dist/client

# Install only production dependencies
RUN yarn install --production

# Expose the port your server listens on
EXPOSE 3000

# Start the server
CMD ["node", "dist/server.js"]
