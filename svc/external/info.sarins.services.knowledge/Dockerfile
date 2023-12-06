#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["external/info.sarins.services.knowledge/info.sarins.services.knowledge.csproj", "external/info.sarins.services.knowledge/"]
COPY ["common/info.sarins.services.shared/info.sarins.services.shared.csproj", "common/info.sarins.services.shared/"]
RUN dotnet restore "external/info.sarins.services.knowledge/info.sarins.services.knowledge.csproj"
COPY . .
WORKDIR "/src/external/info.sarins.services.knowledge"
RUN dotnet build "info.sarins.services.knowledge.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "info.sarins.services.knowledge.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "info.sarins.services.knowledge.dll"]