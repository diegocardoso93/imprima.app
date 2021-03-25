<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('address', 512)->nullable();
            $table->string('city', 512)->nullable();
            $table->string('cellphone', 512)->nullable();
            $table->decimal('total')->nullable();
            $table->string('status')->nullable();
            $table->string('payment_type')->nullable();
            $table->string('preference_id')->index()->nullable();
            $table->string('origin')->nullable();
            $table->foreignId('merchant_id')->constrained('merchants');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
